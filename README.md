This is a fork of timbr-io's [Jupyter-React-Example](https://github.com/timbr-io/jupyter-react-example).

# Jupyter-React-Example

A completely working example of how to leverage any react component inside a Jupyter NbExtension using [Jupyter-React](https://github.com/timbr-io/jupyter-react) and [Jupyter-React-JS](https://github.com/timbr-io/jupyter-react-js).

## Installing 

```
git clone https://github.com/RFirstman/jupyter-react-example.git
cd jupyter-react-example && python setup.py develop
jupyter notebook 
```

## Usage 

Inside a Jupyter Notebook
```python
from example import TestComponent
from IPython.display import display
import random

color = "#48f542"

mything = TestComponent(props={"color": color})
display(mything)
```

## How to add custom components

### JavaScript

Navigate to `js/src/components/`. Here, create a new file for your new component. For the purposes of this tutorial, assume we create
a file `js/src/components/newcomponent.js`, but you can name it whatever you want. This new file can contain a React component.
For example,
```javascript
import React from 'react';

export default function NewComponent( props ) {
    return (
        <p>Looking forward to appearing in a Jupyter Notebook near you!</p>
    );
}
```
Now, open the file `js/src/components/index.js` and add your new component to the export statement. So, `index.js` will now look like:
```javascript
import TestComponent from './testcomponent';
import NewComponent from './newcomponent';

export default {
  NewComponent,
  TestComponent
};
```
Note that the `TestComponent` declarations already existed in the file before our changes.

Finally, navigate to the `js/` directory. Run:
```
npm i
npm run prepublish
```
The above commands will install the required NPM dependencies and create a webpack build for your updated JavaScript.
You will need to run this every time you wish to update the JavaScript.

### Python

Navigate to `example/` and create a new python file. We'll call it `newcomponent.py`. `example/newcomponent.py` will look like:
```python
from jupyter_react import Component 

class NewComponent(Component):
    module = 'NewComponent'

    def __init__(self, **kwargs):
        super(NewComponent, self).__init__(target_name='react.jupyter.test', **kwargs)
        self.on_msg(self._handle_msg)

    def _handle_msg(self, msg):
        print(msg)
```

Now open `example/__init__.py`. Edit this file so it reads:
```python
from .testcomponent import TestComponent
from .newcomponent import NewComponent

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'example',
        'require': 'example/index'
    }]
```
Note that the only change here is the added import statement for our new component.

Finally, navigate back to the root directory of the project and run:
```
python setup.py develop
```

Now, you can open Jupyter Notebook and use your new component!