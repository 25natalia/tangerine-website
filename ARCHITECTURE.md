# Arquitectura — Tangerine Website

## Relación con el Design System

`tangerine-website` y `tangerine-design-system` son dos repos independientes. El Design System es
un producto propio, con su propio roadmap y documentación. Esta web es, hoy, su primer consumidor
real — no su dueño.

## La regla (estricta, sin excepciones)

1. Ningún componente reutilizable nace en este repo.
2. Si el componente existe en el DS → se porta.
3. Si necesita una mejora o falta un componente → se construye/corrige primero en el DS, se
   documenta ahí, y recién entonces se porta.
4. Nunca se edita la lógica interna de un componente ya portado — solo el contenido o las props
   que se le pasan desde acá. Si hace falta tocar el interior, eso es el punto 3 otra vez.
5. Todo lo portado se registra en [`DESIGN_SYSTEM_SYNC.md`](./DESIGN_SYSTEM_SYNC.md).

## Cómo se porta (sin monorepo, sin paquete npm — por decisión deliberada)

No hay ningún mecanismo de build que resuelva un import entre los dos repos. El porteo es una
copia deliberada del archivo (o los archivos) desde el DS, verificada con `diff` contra el
original antes de darla por buena, y registrada en el manifiesto de sync con el commit del DS del
que salió.

## Trabajar con ambos repos a la vez

Clonar `tangerine-design-system` y `tangerine-website` como carpetas hermanas bajo un mismo padre,
y abrir `tangerine-design-system/tangerine.code-workspace` en VS Code — un archivo local, no
versionado (cada desarrollador lo recrea con la misma forma: dos folders, uno por repo).
