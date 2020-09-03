import os 
from deepface import DeepFace
from PIL import Image

img="uploads/3.png"


attributes= ['emotion']
demography= DeepFace.analyze(img, attributes)
print(demography)
if demography["dominant_emotion"] == "happy":
    print(demography["dominant_emotion"])
    print(" We are glad that you are happy with our courses ")
    print(" We will generate courses for You ")
else:
    print(demography["dominant_emotion"] + " Is this how you feel ?")

os.remove(img)

