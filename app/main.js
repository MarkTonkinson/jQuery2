$(document).ready(function(){

	$('#newTaskForm').hide();

	var listo = [];

	var Task = function(task){
		this.task = task;
		this.status = 'new';
	};

	//opens form
	$("#newListItem").on('click', function(){
		//$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
		$('#newTaskForm').slideDown();
		$('#newListItem').fadeToggle('fast','linear');
	});

	//closes form
	$('#cancel').on('click', function(){
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});

	var addTask = function(task){
		if (task) {
			task = new Task(task);
			listo.push(task);
			save();//I don't have to save task- because each time the whole array is being pushed below in the function
			$('#newItemInput').val('');
			$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item"><span><i class="fa fa-arrow-left" id="back-arrow"></i></span>' + task.task + '<span><i class="fa fa-arrow-right"></i></span></li></a>');
		}
	};

	$('#saveNewItem').on('click', function(e){
		e.preventDefault();//prevents the links from refreshing the page- because you are clicking on items and an href#a would reload the page
		var task = $("#newItemInput").val().trim();
		addTask(task);
	});

	
	var taskDigress = function(task){
		var change = task.innerText.trim();//takes the task and trims any white space on beginning or end before sending it on
		for(var i = 0; i < listo.length; i++) {
			if (listo[i].task === change) {
				if(listo[i].task === "new"){
					alert("You deleted your to do");
					listo.splice(i, 1);
				} else if (listo[i].task === "inProgress"){
					listo[i].status = "new";
				} else {
					listo[i].task = "inProgress";
				}
				save();
				break;
			}
		}
	};	
	


	var advanceTask = function(task){
		var modified = task.innerText.trim();//jquery or something adds an extra space
		for (var i = 0; i < listo.length; i++){
			if (listo[i].task === modified) {
				if (listo[i].status === 'new') {
					listo[i].status = 'inProgress';
				} else if (listo[i].status === 'inProgress'){
					listo[i].status = "archived";
				} else {
					listo.splice(i, 1);
				}
				save();
				break;
			}
		}
		task.remove();
	}

	//Saving the information
	var save = function() {
		localStorage["listo"] = JSON.stringify(listo);
		//localStorage is an array that exists on the window
		//but if you were just to push the array to it- it would
		//store the string obj obj if you wrote
		//localStorage.listo = listo;
		//so JSON is a function that has a method stringify
		//that will take your array and convert data into
		//JSON format that the website can read
	}

	//retrieving information

	var populateLists = function () {
		var storedList = JSON.parse(localStorage.getItem("listo"));
		for (var i = 0; i < storedList.length; i++) {
			if (storedList[i].status === 'new') {
				$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item"><span><i class="fa fa-arrow-left" id="back-arrow-1"></i></span>' + storedList[i].task + '<span class="status"><i class="fa fa-arrow-right"></i></span></li></a>')
			} else if (storedList[i].status === 'inProgress') {
				$('#currentList').append('<a href="#" class="" id="inProgress"><li class="list-group-item"><span><i class="fa fa-arrow-left" id="back-arrow-2"></i></span>' + storedList[i].task + '<span class="status"><i class="fa fa-arrow-right"></i></span></li></a>')
			} else {
				$('#archivedList').append('<a href="#" class="" id="archived"><li class="list-group-item"><span><i class="fa fa-arrow-left" id="back-arrow-3"></i></span>' + storedList[i].task + '<span class="status"><i class="fa fa-arrow-right"></i></span></li></a>')
			}
		}
	};
	//checks to see if there is anything in the lists and then
	//sends it to populate the list
	if (localStorage.getItem('listo')) {
		listo = JSON.parse(localStorage["listo"]);
		populateLists();
	}

	//change status of list item to progressed
	$(document).on('click', '#item', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id="inProgress";
		$('#currentList').append(this.outerHTML);
	});
	//change status of list item to archived
	$(document).on('click', '#inProgress', function(e){
		e.preventDefault();
		var task = this;
		this.id="archived";
		advanceTask(task);
		$('#archivedList').append(this.outerHTML)
	});

	//delete an item
	$(document).on('click', '#archived', function (e) {
	    e.preventDefault();
	    var task = this;
	    advanceTask(task);
	});
	//trying to make it digress . . . .

	$(document).on('click', '.fa-arrow-left', function(e) {
		debugger;
		e.preventDefault();
		var task = this;
		taskDigress(task);
	});

});//end document






