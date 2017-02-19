import Coordinate from './coordinate';

export const Direction = {
  UP    : new Coordinate(  0, -1 ),
  DOWN  : new Coordinate(  0,  1 ),
  LEFT  : new Coordinate( -1,  0 ),
  RIGHT : new Coordinate(  1,  0 ),

  allArray : [
    new Coordinate(  0, -1 ),
    new Coordinate(  0,  1 ),
    new Coordinate( -1,  0 ),
    new Coordinate(  1,  0 )
  ],

  fromStr : function(string) {
    switch(string) {
      case 'up'    : return this.UP;
      case 'down'  : return this.DOWN;
      case 'left'  : return this.LEFT;
      case 'right' : return this.RIGHT;
    }
  },

  getAvailable : function(direction) {
    if(direction.equals(this.UP) || direction.equals(this.DOWN)) {
      return [this.LEFT, this.RIGHT];
    }
    if(direction.equals(this.LEFT) || direction.equals(this.RIGHT)) {
      return [this.UP, this.DOWN];
    }
  }
};


/*export const Direction = {
  UP    : new Coordinate(  0, -1 ),
  DOWN  : new Coordinate(  0,  1 ),
  LEFT  : new Coordinate( -1,  0 ),
  RIGHT : new Coordinate(  1,  0 )
};

export const DirectionFromStr = {
  'up'    : Direction.UP,
  'down'  : Direction.DOWN,
  'left'  : Direction.LEFT,
  'right' : Direction.RIGHT
};

export const DirectionArray = [
  Direction.UP,
  Direction.DOWN,
  Direction.LEFT,
  Direction.RIGHT
];

export AvailableDirections = function(direction) {
  switch(direction) {

  }
}
AvailableDirections.set(Direction.UP,    [Direction.LEFT, Direction.RIGHT]);
AvailableDirections.set(Direction.DOWN,  [Direction.LEFT, Direction.RIGHT]);
AvailableDirections.set(Direction.LEFT,  [Direction.UP,   Direction.DOWN]);
AvailableDirections.set(Direction.RIGHT, [Direction.UP,   Direction.DOWN]);
*/
