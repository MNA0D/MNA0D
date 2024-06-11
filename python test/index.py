from PIL import Image
import piexif

def add_comment_to_image(input_image_path, output_image_path, comment):
    # Ouvrir l'image
    image = Image.open(input_image_path)
    
    # Charger les métadonnées EXIF existantes ou créer une nouvelle structure EXIF
    exif_data = image.info.get('exif')
    if exif_data:
        exif_dict = piexif.load(exif_data)
    else:
        exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "Interop": {}, "1st": {}, "thumbnail": None}
    
    # Ajouter le commentaire en tant que métadonnée EXIF
    exif_dict['Exif'][piexif.ExifIFD.UserComment] = comment.encode('utf-8')
    
    # Sauvegarder l'image avec les nouvelles métadonnées
    exif_bytes = piexif.dump(exif_dict)
    image.save(output_image_path, "jpeg", exif=exif_bytes)

# Chemin de l'image d'origine et de sortie
input_image_path = 'chat.jpg'
output_image_path = 'chat_with_comment.jpg'
comment = "Ce texte est un exemple de code injecté dans les métadonnées."

# Ajouter le commentaire à l'image
add_comment_to_image(input_image_path, output_image_path, comment)

print(f"Le commentaire a été ajouté à l'image {output_image_path}.")
