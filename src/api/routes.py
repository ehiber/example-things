"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Episode, Schedule
from api.utils import generate_sitemap, APIException
import json

api = Blueprint('api', __name__)

# POST = puedas agendar una fecha para ver un episodio 
# PUT = editar la fecha
# DELETE = eliminar la fecha 

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Deberia estar autenticado con JWT
@api.route('/schedule-episode/' , defaults={'id': None} ,methods=['GET','POST','DELETE'])
@api.route('/schedule-episode/<int:id>' ,methods=['GET','PUT','DELETE'])
def handle_schedule_episode(id):
    if request.method == 'POST':
        #Chequear si el episodio existe
        #Chequear si el usuario existe
        #Crear el schedule
        data = request.json
        # objeto que esperamos
        # {
        #     date:'date'
        #     api_id:0
        # }
        #AQUI FALTARIA UN CHINGO DE VALIDACIONES
        episode = Episode(**data)
        episode.create()
        schedule = Schedule(1, episode.id)
        schedule.create()
        response_body = {
            "message": "Agendo su episodio con EEEEEXITO :D"
        }
        return jsonify(response_body), 201

    elif request.method == 'PUT':
        data = request.json
        #AQUI FALTARIA UN CHINGO DE VALIDACIONES
        episode = Episode.query.get(id)
        episode.update(data['new_date'])
        response_body = {
            "message": "CAMBIO SU VAINA CON EXITO SIIUUU"
        }
        return jsonify(response_body), 200

    elif request.method == 'DELETE':
        episode = Episode.query.get(id)
        episode.delete()
        response_body = {
            "message": "Eliminado T_____________T"
        }
        return jsonify(response_body), 200

    else:
        #AQUI FALTARIA UN CHINGO DE VALIDACIONES
        if id is None:
            schedules = Schedule.query.filter_by(user_id=1).all()
            episodes = list(map(lambda schedule: Episode.query.get(schedule.episode_id).serialize(),schedules))
            response_body = {
                "episodes": episodes,
                "message": "Toma tus episodios"
            }
        else:
            episode = Episode.query.get(id)
            response_body = {
                "episode": episode.serialize(),
                "message": "Toma tu episodio"
            }
        return jsonify(response_body), 200