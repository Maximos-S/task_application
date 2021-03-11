from flask import Blueprint, jsonify, session, request
from app.models import List, db

list_routes = Blueprint('lists', __name__)


@list_routes.route('/')
def get_lists():
    """
    Sends Lists

    """
    lists = List.query.all()
    lists = [list.to_dict() for list in lists]
    print("lists", lists[0])
    return {"lists": lists}


