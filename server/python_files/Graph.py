class Node:
    def __init__(self,state):
        self.parent = None
        self.state = state
        self.children = []
        
    def add_child(self, child, cap=7):
        if (len(self.children) >= cap):
            raise Exception("Node cannot have more than 6 children")
        child.add_parant(self)
        self.children.append(child)
        
    def add_parant(self, parent):
        if (self.get_parent() is not None):
            raise Exception("Node already has a parant")
        
        self.parent = parent
    
    def get_children(self):
        return self.children
    
    def get_child(self, index):
        return self.children[index]
    
    def get_state(self):
        return self.state
    
    def set_state(self, state):
        self.state = state
        
    def get_parent(self):
        return self.parent
    
    def print(self):
        print(self.state)
        for child in self.children:
            child.print()
                
if __name__ == "__main__":
    root = Node("A")
    root.add_child(Node("B"))
    root.add_child(Node("C"))
    root.add_child(Node("D"))
    root.get_child(0).add_child(Node("E"))
    root.get_child(0).add_child(Node("F"))
    root.get_child(2).add_child(Node("G"))
    root.get_child(2).add_child(Node("H"))
    

    root.print()