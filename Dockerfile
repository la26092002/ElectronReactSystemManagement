FROM node:lts-bullseye  
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Add a user to run Electron (for security reasons)
RUN groupadd -r electron && useradd --no-log-init -r -g electron electron
RUN chown -R electron:electron /app
USER electron

# Install Electron globally
RUN npm install -g electron

# Expose X11 socket for GUI apps (ensure DISPLAY is set correctly)
ENV DISPLAY=:0

# Run the Electron app
CMD ["npm", "start"]
