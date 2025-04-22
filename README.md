# Configuration and Installation

1. Configurar el `.editorconfig` para el editor de texto favorito (VSCode) recordar tener la extensión `EditorConfig` instalada. y la configuracion se puede obtener de [este link](https://editorconfig.org).

2. Configurar el `.eslintrc.json` para el editor de texto favorito (VSCode) revisar como esta configurado el linter en [este link](https://eslint.org/docs/user-guide/configuring). o revisar como esta configurado el linter en este proyecto.

3. Configurar el `.gitignore` para el el proyecto usando este [link](https://www.toptal.com/developers/gitignore).

4. Instalar las dependencias de desarrollo usando el siguiente comando:

```bash
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
```

5. Probar el proyecto para desarrollo y producción usando el siguiente comando:

- Para desarrollo:
```bash
npm run dev
```

- Para producción:
```bash
npm run start
```

6. Clean Arquitecture
- Controllers(router, middlewares)
- Services
- Models

7. Middlewares
- Estan en medio de el request y el response, la propiedad next es la que se pasa a la siguiente middleware.
- Middlewares de tipo error: se encargan de manejar errores, por ejemplo, el middleware de error de validación.(error, req, res, next)

8. Joi
- Joi es una librería de validación de datos que nos ayuda a crear esquemas de validación de datos.

9. Mas Middlewares
- Cors
- Morgan
- Helmet
- Express Debug
- Express Slash
- Passport

10. Recomendaciones antes de enviar a producción
- Cors
- Https
- Procesos de Build
- Remover logs
- Seguridad(Helmet)
- Testing

### Documentación
[Documentación del proyecto](Docs/Doc.md)
