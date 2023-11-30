### Imports Flask module
from flask import Flask,redirect,request
### Imports random number module
from random import randint

### Instantiates Flask app
app = Flask(__name__)

### Data Storage - we want to replace this with a database 
data = {'events':[]}

### If I go to root, automatically redirect to events endpoint
@app.route('/',methods=['GET'])
def get_root():
    return redirect('/events',301)

# How to set up a route with Get and Post methods
@app.route("/events", methods=['GET', 'POST'])
def get_events():
    if request.method == 'POST':
        # creating an item object
        new_item = {}
        new_item['id'] = str(randint(0,1000))
        # getting data from the form. 
        # we should probably validate this.
        new_item['eventName'] = request.form['eventName']
        new_item['eventDate'] = request.form['eventDate']      
        new_item['eventLocation'] = request.form['eventLocation']
        # appends item to local database
        data['events'].append(new_item)
        return redirect('/events',301)
    else:
        # Creates a table with the events that have been created
        # Displaying only ID and Title
      return f'''
        <h2>Current Events:</h2>
        <table><tr><th>ID</th><th>Event Title</th></tr>
        {''.join([f"<tr><td>{x['id']}</td><td>{x['eventName']}</td><tr>" for x in data['events']])}</table>
        <form method="post">
            <p>Event<input type=text name=eventName>
            <p>Date<input type=text name=eventDate>
            <p>Location<input type=text name=eventLocation>
            <p><input type=submit value=Update>
        </form>'''

# To get more information, we can call the endpoint with a specific ID
@app.route("/events/<id>", methods=['GET'])
def get_event(id):
    # Finds event
    if id in [x['id'] for x in data['events']]:
        # Just displays the event. May wish to format this.
        return f'''
        <h2>Current Event: {[x for x in data['events'] if x['id']==id][0]}</h2>
        <a href="../events">return</a>
        '''
    # If event not found
    else:
      return f'''
        <p>Not Found</p>
        <a href="../events">return</a>'''

# runs application
if __name__ == "__main__":
    app.run()