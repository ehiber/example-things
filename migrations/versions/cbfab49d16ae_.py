"""empty message

Revision ID: cbfab49d16ae
Revises: 13dd3914e8d9
Create Date: 2022-06-09 22:17:32.413123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cbfab49d16ae'
down_revision = '13dd3914e8d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('episode',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('api_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('episode_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['episode_id'], ['episode.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('schedule')
    op.drop_table('episode')
    # ### end Alembic commands ###
