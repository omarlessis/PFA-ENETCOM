# Étape 1 : Utiliser l'image Node.js officielle comme image de base
FROM node:14 as builder

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install --force

# Étape 5 : Copier le reste des fichiers de l'application
COPY . .

# Étape 6 : Définir le script de build dans le package.json
RUN echo "{\"scripts\":{\"build\":\"ng build\"}}" > package.json

# Étape 7 : Construire l'application Angular
RUN npm run build --force

# Étape 9 : Exposer le port 4200
EXPOSE 4200

CMD ["npm", "run", "start"]

