from flask import Blueprint, jsonify, session, request
from app.models import Task, List, Comment, db
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)

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

@task_routes.route("/<id>", methods=["POST"])
def create_comment(id):
    data = request.form["content"]
    comment = Comment(content=data, taskId=id)
    db.session.add(comment)
    db.session.commit()
    return {"message": "success"}

@task_routes.route("/comments/<id>", methods=["DElETE"])
def delete_comment(id):
    comment = Comment.query.filter_by(id=id).first()
    db.session.delete(comment)
    db.session.commit()

    return {"message": "success"}

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

@task_routes.route('/<id>', methods=["DELETE"])
def delete_task(id):
    """
    Deletes Task

    """
    try:
        task = Task.query.filter_by(id=id).first()
        lists = List.query.all()
        db.session.delete(task)
        db.session.commit()
        lists = [list.to_dict() for list in lists]

        return {"lists": lists}
    except(e):
        return {"errors": ["there was a problem"]}
