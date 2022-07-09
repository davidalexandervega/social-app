alright, so to enter the virtual env,
from the api folder, RUN:
source venv/bin/activate

you can RUN: pip3 list
in order to see the packages available in the venv.

you can also RUN: python3 manage.py runserver
to start the django development server on port 8000.

to update database models, first RUN: python3 manage.py makemigrations
then RUN: python3 manage.py migrate

if you're making a change to database models,
and are getting errors related to specifying a 'default value' 
& you're relatively early on in the development cycle,
you might as well clear out the database in postgres:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
this way you don't need to run DROP DATABASE if you're hosting it already.
now you can make migrations and migrate.

*NOTE: remember to use 'python3' and 'pip3'