# Chatbot React avec Ollama et Mistral

Ce projet est un chatbot React qui utilise Ollama avec le modèle Mistral pour générer des réponses.

## Configuration requise

1. Installez Ollama si ce n'est pas déjà fait
2. Installez le modèle Mistral :
   ```bash
   ollama pull mistral
   ```
3. Lancez Ollama :
   ```bash
   ollama serve
   ```

## Démarrage du projet

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Lancez l'application :
   ```bash
   npm run dev
   ```

## Structure du projet

- `src/components/Chatbot.tsx` : Le composant principal du chatbot
- `src/components/Chatbot.css` : Les styles du chatbot
- `src/App.tsx` : Point d'entrée de l'application

## Communication avec Ollama

L'application utilise directement l'API REST d'Ollama pour communiquer avec le modèle Mistral. C'est une approche plus simple et plus efficace que d'utiliser une couche de compatibilité comme FastMCP car :

- Ollama a déjà une API REST simple et bien documentée
- Pas besoin d'une couche supplémentaire qui ajouterait de la complexité
- Meilleure performance car une couche de moins à traverser
- Plus facile à maintenir et à comprendre
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
