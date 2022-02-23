#!/usr/bin/env python3

import glob
import re
import os
from distutils.dir_util import copy_tree


import shutil

try:
	shutil.rmtree('_sharedScripts')
except:
	print("...")

copy_tree("../../_shared/_sharedScripts", "_sharedScripts")

# All files ending with .js
allJavascriptFilePaths = glob.glob("**/*.js", recursive=True)
inheritanceFilesJavascriptFilePaths = [];
inheritances = [];
sortedJavascriptFilePaths = [];

for file in allJavascriptFilePaths:
	with open(file, 'r') as read_obj:
		isExtended = 0
		for line in read_obj:
			if 'extends' in line:
				splitted = re.split('\s+', line)
				inheritance = [splitted[1], splitted[3]]
				inheritances.append(inheritance);
				inheritanceFilesJavascriptFilePaths.append(file);
				isExtended = 1
				break
		if isExtended == 0:
			sortedJavascriptFilePaths.append(file)


for i in allJavascriptFilePaths:
	index = -1
	for inheritance in inheritances:
		index = index + 1
		isSomeonesChild = 0
		for comparedInheritance in inheritances:
			if not inheritance is comparedInheritance:
				if inheritance[1] == comparedInheritance[0]:
					isSomeonesChild = 1
					break
		if isSomeonesChild == 0:
			path = inheritanceFilesJavascriptFilePaths[index]
			sortedJavascriptFilePaths.append(path)
			inheritanceFilesJavascriptFilePaths.remove(path)
			inheritances.remove(inheritance)


file = open('imports.js', 'w')

for path in sortedJavascriptFilePaths:
	if not path == 'imports.js' and not path == "MMain.js":
		file.write("""document.write('<script src="scripts/""" + path.replace('\\','/') + "?" + "'+ Date.now() + '" + """"></script>');""" + "\n")


file.write("""document.write('<script src="scripts/""" + "MMain.js" + "?" + "'+ Date.now() + '" + """"></script>');""" + "\n")

file.close()
