
# Trustero Tasks
> [Trustero Tasks](https://maximos-tasks.herokuapp.com) is a fullstack React App with a Postgres database created by me, Maximos Salzman. Trustero Tasks allows users to use CRUD operations to add to Daily, Weekly, and Monthly task lists. I implemented a Flask server on the backend with FlaskSQLAlchemy, and WTFforms. The backend API follows RESTful principles (code pictured below) to allow the client to create, edit and delete tasks and comments. A global state is provided to the frontend through React Context. This allows for easy updates to the user interface. Following a prompt, I designed a database with several cascading one to many relationships(pictured below). I used a React UI framework as well as custom CSS to create an intuitive user experience. Please feel free to check out the [live site](https://maximos-tasks.herokuapp.com) or start it locally(instructions below)!

![](trustero_tasks.gif)

![](database.png)

```
export const create_task = async(payload) => {
  const response = await fetch("/api/tasks/", {
    method: "post",
    body: payload
  })
  return await response.json()
}
export const edit_task = async(payload,id) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    body: payload
  })
  return await response.json()
}
```
```
@task_routes.route('/', methods=["POST"])
def create_task():
    form = TaskForm()
    if form.validate_on_submit:
        task = Task(title=form.data["title"], description=form.data["description"], status=form.data["status"], listId=form.data["list_id"])
        db.session.add(task)
        db.session.commit()
        return {"message": "your form was submitted"}
    else:
        return {"error": "there was a problem submitting your form"}
        
@task_routes.route('/<id>', methods=["PATCH"])
def edit_task(id):
    form = TaskForm()
    if form.validate_on_submit:
        task = Task.query.filter_by(id=id).first()
        task.title = form.data["title"]
        task.description = form.data["description"]
        task.status = form.data["status"]
        task.listId = form.data["list_id"]
        db.session.add(task)
        db.session.commit()
        return {"message": "success"}
    else:
        return {"error": "there was an error"}
```

## Run the Application Yourself!

### Easy Way:

   Visit this [link](https://maximos-tasks.herokuapp.com)

### Hard Way:

1. Clone this repository (only this branch)

   git clone https://github.com/Maximos-S/task_application.git

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

