import json
import sys

filename = sys.argv[1]
f = open(filename, "r")

def getSubjectName(data):
    return data['subjectName']

def getDisplayName(data):
    return data['class']['course']['title']

def getCourseNumber(data):
    return data['class']['course']['catalogNumber']['formatted']

def getSection(data):
    return data['component']['code'] + " " + data['number']

def getLocation(data):
    try:
        return data['meetings'][0]['location']['description']
    except:
        return ""

def _getDate(data):
    try:
        days = data['meetings'][0]['meetsDays']
        startTime = data['meetings'][0]['startTime']
        endTime = data['meetings'][0]['endTime']
        return [days, startTime, endTime]
    except:
        return [""]*3

def getDays(data):
    return _getDate(data)[0]

def getStartTime(data):
    return _getDate(data)[1]

def getEndTime(data):
    return _getDate(data)[2]
