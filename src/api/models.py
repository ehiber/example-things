from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Get = traer las fechas
# POST = puedas agendar una fecha para ver un episodio 
# PUT = editar la fecha
# DELETE = eliminar la fecha 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    schedule = db.relationship('Schedule', lazy = True, backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

# EPISODIOS FECHAS AGENDAR
class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    api_id = db.Column(db.Integer, nullable=False)
    schedule = db.relationship('Schedule', lazy = True, backref='episode')

    def __init__(self,date,api_id):
        self.date = date
        self.api_id = api_id

    def create(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            db.session.rollback()
            print('An error has ocurred')
            return False

    def update(self,new_date):
        self.date = new_date
        db.session.commit()
        return True

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return True

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "api_id": self.api_id
        }

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    episode_id = db.Column(db.Integer, db.ForeignKey('episode.id'))
    
    def __init__(self,user_id,episode_id):
        self.user_id = user_id
        self.episode_id = episode_id

    def create(self):
        db.session.add(self)
        db.session.commit()
        return True
