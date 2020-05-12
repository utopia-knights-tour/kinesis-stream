import itertools
from datetime import timedelta, date
import random
import csv

def daterange(date1, date2):
    for n in range(int ((date2 - date1).days)+1):
        yield date1 + timedelta(n)

start_dt = date(2020, 5, 15)
end_dt = date(2020, 6, 15)
dates = [dt.strftime("%Y-%m-%d") for dt in daterange(start_dt, end_dt)]
airports = ['ATL', 'DEN', 'DFW', 'EWR', 'JFK', 'LAS', 'LAX', 'MCO', 'ORD', 'SEA', 'SFO' ]
hours = ['{:02}:00:00'.format(x) for x in range(0,24)]
flights = itertools.permutations(airports, 2)
flightslist = list(flights)
flights_with_dates = [[flight[0], flight[1], date, date] for date in dates for flight in flightslist]
for flight in flights_with_dates:
  departure = random.randrange(0,22)
  flight.insert(0, random.randrange(50, 200))
  flight.insert(0, hours[departure])
  flight.insert(0, random.randrange(10000, 40000)/100)
  flight.insert(0, hours[departure+2])

with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(flights_with_dates)






