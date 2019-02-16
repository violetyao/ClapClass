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

def tester():
    next_line = f.readline().rstrip()
    while next_line:
        data = json.loads(next_line)
        print(getSubjectName(data) + " " + getCourseNumber(data) + " " + getSection(data))
        print(getDisplayName(data))
        print(getLocation(data))
        print(getDays(data) + " " + getStartTime(data) + " " + getEndTime(data))
        next_line = f.readline().rstrip()

output = {}
next_line = f.readline().rstrip()
while next_line:
    data = json.loads(next_line)
    subjectName = getSubjectName(data)
    courseNumber = getCourseNumber(data)

    # Create dictionary if does not exist
    if subjectName not in output:
        output[subjectName] = {}

    output[subjectName][courseNumber] = {
        "location": getLocation(data),
        "startTime": getStartTime(data),
        "endTime": getEndTime(data),
        "days": getDays(data),
        "students": [],
        "displayName": getDisplayName(data),
        "section": getSection(data),
    }
    next_line = f.readline().rstrip()

fout = open(filename + ".json", "w")
fout.write(json.dumps(output))
fout.close()
f.close()
