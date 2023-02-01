<aura:application >
    <link href = '/resource/Bootstrap/' rel = "stylesheet" />
    <div class = "navbar navbar-default navbar-static-top" role = "navigation">
    	<div class = "container">
        	<div class = "navbar-header">
                <a href = "#" class = "navbar-brand"> Lighting Contacts </a>
            </div>
        </div>
     </div>
	<div class = "container">
    	<div class = "row">
            <div>
                <c.ContactDetail/>
            </div>
        	<div class = "col-sm-12">
                Contact List
                <c:ContactList/>
                
            </div>
        </div>
     </div>
	
    
</aura:application>