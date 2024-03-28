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

# Étape 6 : Construire l'application Angular
RUN npm run build

# Étape 7 : Utiliser l'image NGINX officielle comme image de production
FROM nginx:alpine

# Étape 8 : Copier les fichiers de construction de l'application Angular dans le dossier NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Étape 9 : Exposer le port 80
EXPOSE 80

# Étape 10 : Commande de démarrage pour exécuter NGINX dans le conteneur
CMD ["nginx", "-g", "daemon off;"]
