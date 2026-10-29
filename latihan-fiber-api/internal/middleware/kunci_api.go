package middleware

import (
	"crypto/subtle"

	"github.com/gofiber/fiber/v3"
)

func KunciApi(kunci string) fiber.Handler {
	return func(c fiber.Ctx) error {
		header := c.Get("X-Api-Key")

		if kunci == "" || subtle.ConstantTimeCompare([]byte(header), []byte(kunci)) != 1 {
			return fiber.NewError(fiber.StatusUnauthorized, "X-Api-Key tidak valid")
		}

		return c.Next()
	}
}
