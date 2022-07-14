from jupyter_react import Component 

class TestComponent(Component):
    module = 'TestComponent'

    def __init__(self, **kwargs):
        super(TestComponent, self).__init__(target_name='react.jupyter.test', **kwargs)
        self.on_msg(self._handle_msg)

    def _handle_msg(self, msg):
        print(msg)
