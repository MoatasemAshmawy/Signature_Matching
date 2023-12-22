"""Extract signatures from an image."""
# ----------------------------------------------
# --- Author         : Ahmet Ozlu
# --- Mail           : ahmetozlu93@gmail.com
# --- Date           : 17th September 2018
# ----------------------------------------------

import cv2
import matplotlib.pyplot as plt
from skimage import measure, morphology
from skimage.color import label2rgb
from skimage.measure import regionprops
import numpy as np
import uuid
import os

def extract_signature(image_path):
    # the parameters are used to remove small size connected pixels outliar 
    constant_parameter_1 = 84
    constant_parameter_2 = 250
    constant_parameter_3 = 100

    # the parameter is used to remove big size connected pixels outliar
    constant_parameter_4 = 18

    # read the input image
    img = cv2.imread(image_path, 0)
    img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)[1]  # ensure binary

    # connected component analysis by scikit-learn framework
    blobs = img > img.mean()
    print(blobs)

    blobs_labels = measure.label(blobs, background=1)
    # image_label_overlay = label2rgb(blobs_labels, image=img)

    # fig, ax = plt.subplots(figsize=(10, 6))

 
    # # plot the connected components (for debugging)
    # ax.imshow(image_label_overlay)
    # ax.set_axis_off()
    # plt.tight_layout()
    # plt.show()
   

    the_biggest_component = 0
    total_area = 0
    counter = 0
    average = 0.0
    for region in regionprops(blobs_labels):
        if (region.area > 10):
            total_area = total_area + region.area
            counter = counter + 1
        # print region.area # (for debugging)
        # take regions with large enough areas
        if (region.area >= 250):
            if (region.area > the_biggest_component):
                the_biggest_component = region.area

    average = (total_area/counter)
    # print("the_biggest_component: " + str(the_biggest_component))
    # print("average: " + str(average))

    # experimental-based ratio calculation, modify it for your cases
    # a4_small_size_outliar_constant is used as a threshold value to remove connected outliar connected pixels
    # are smaller than a4_small_size_outliar_constant for A4 size scanned documents
    a4_small_size_outliar_constant = ((average/constant_parameter_1)*constant_parameter_2)+constant_parameter_3
    # print("a4_small_size_outliar_constant: " + str(a4_small_size_outliar_constant))

    # experimental-based ratio calculation, modify it for your cases
    # a4_big_size_outliar_constant is used as a threshold value to remove outliar connected pixels
    # are bigger than a4_big_size_outliar_constant for A4 size scanned documents
    a4_big_size_outliar_constant = a4_small_size_outliar_constant*constant_parameter_4
    # print("a4_big_size_outliar_constant: " + str(a4_big_size_outliar_constant))

    # remove the connected pixels are smaller than a4_small_size_outliar_constant
    pre_version = morphology.remove_small_objects(blobs_labels, a4_small_size_outliar_constant)
    # remove the connected pixels are bigger than threshold a4_big_size_outliar_constant 
    # to get rid of undesired connected pixels such as table headers and etc.
    component_sizes = np.bincount(pre_version.ravel())
    too_small = component_sizes > (a4_big_size_outliar_constant)
    too_small_mask = too_small[pre_version]
    pre_version[too_small_mask] = 0
    # save the the pre-version which is the image is labelled with colors
    # as considering connected components
    pre_version_path = "./outputs/pre_version_" + str(uuid.uuid4()) + ".png"
    cv2.imwrite(pre_version_path, pre_version)

    # read the pre-version
    img = cv2.imread(pre_version_path, 0)
    # ensure binary
    img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    # save the the result
    output_file_name = "output_"+ str(uuid.uuid4())+".png"
    cv2.imwrite(f"./outputs/{output_file_name}", img)
    os.remove(pre_version_path)

    return output_file_name


if __name__ == "__main__":
   extract_signature("./inputs/in1.jpg")