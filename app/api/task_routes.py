from flask import Blueprint, jsonify, session, request
from app.models import Task, List, db
from forms import TaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/', methods=["POST"])
def create_task():
    print("#######")
    form = TaskForm()
    if form.validate_on_submit():
        task = Task(form.data["title"], form.data["description"], form.data["status"], form.data["list_id"])
        db.session.add(task)
        db.session.commit()
    return {"message": "no task to get"}

@task_routes.route('/<id>', methods=["DELETE",])
def delete_task(id):
    """
    Deletes Task

    """
    print("delorted")
    try:
        task = Task.query.filter_by(id=id).first()
        lists = List.query.all()
        db.session.delete(task)
        db.session.commit()
        lists = [list.to_dict() for list in lists]

        return {"lists": lists}
    except(e):
        return {"errors": ["there was a problem"]}
