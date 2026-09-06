# Eveline Dublan · Front

Next.js 16 + Tailwind + shadcn/ui. El backend es el repositorio `back`
(Bun + Elysia + PostgreSQL); este front ya no usa PocketBase.

## Levantar en local

    cp .env.example .env.local        # NEXT_PUBLIC_API_URL=http://localhost:3001
    bun install
    bun dev

El back debe estar corriendo en el puerto 3001 (ver su README). Para el
panel `/admin` hace falta un administrador creado con `bun run semillas:admin`
en el back.

## Cómo habla con el back

`src/lib/api.ts` envuelve `fetch` con `credentials: "include"`, así la cookie
de sesión httpOnly viaja sola. `src/lib/tipos.ts` tiene las formas que
devuelve el back. Endpoints usados:

    público   GET /v1/servicios · GET /v1/disponibilidad · POST /v1/citas · GET /v1/posts(/:slug)
    auth      POST /v1/auth/entrar · POST /v1/auth/salir · GET /v1/auth/yo
    admin     /v1/admin/citas · /servicios · /clientes · /posts

`proxy.ts` puede proteger `/admin` en el servidor consultando `/v1/auth/yo`
con la cookie, pero solo cuando front y back comparten dominio y el back
emite la cookie con `COOKIE_DOMINIO`; se activa con `ADMIN_GUARD_SERVIDOR=si`.
En dominios distintos queda apagado y la protección la hace el back: toda
llamada sin sesión responde 401 y la página manda a `/login`.
