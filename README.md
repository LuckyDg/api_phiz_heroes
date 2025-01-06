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

### Documentación
[Documentación del proyecto](Docs/Doc.md)
