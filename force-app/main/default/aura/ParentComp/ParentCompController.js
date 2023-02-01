({
	doClick : function(component, event, helper) {
		var childComp = component.find('childComp');
        childComp.child('I am from Parent Component');
	}
})