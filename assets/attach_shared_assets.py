#!/usr/bin/env python3

import glob
import re
import os
from distutils.dir_util import copy_tree


import shutil

try:
	shutil.rmtree('_sharedAssets')
except:
	print("...")

copy_tree("../../_shared/_sharedAssets", "_sharedAssets")
