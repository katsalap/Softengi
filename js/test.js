angular.module("MyApp", ['ui.bootstrap'])
    .controller("Test", function($scope, $filter, $interval) {
        $scope.tabs = [{active:true,disabled:true},{active:false,disabled:true}];
        $scope.exampleTypes = [{label:"Додавання", val:false, action:"+"},{label:"Віднімання", val:false, action:"-"},{label:"Множення", val:false, action:"*"}, {label:"Ділення", val:false, action:"/"}];
        $scope.humans = [{name:"Сашка"},{name: "Толік"}, {name:"Дімон"}, {name:"Стас"}, {name:"Артурчик"}];
        $scope.examinedHuman = $scope.humans[0];
        $scope.change= function(option){$scope.examinedHuman = option;}
        $scope.userResults=[];
        $scope.tasks = [];
        $scope.numTasks=10;
        $scope.endOfTest = false;
        //відсліжується масив типів арифметичних операцій, які обрав користувач
        $scope.$watch( "exampleTypes" , function(n){
            $scope.checkedTypes = $filter("filter")( n , {val:true} );
        }, true );
        //кнопка на табі № 1
        $scope.runTest=function(){
            $scope.endOfTest = false;
            $scope.tasks = [];
            for (var i = 0; i < $scope.numTasks; i++) {
                $scope.randomAction = Math.floor(Math.random()*$scope.checkedTypes.length);
                $scope.selectedAction = $scope.checkedTypes[$scope.randomAction];
                var flag = 2;
                while(flag==2) {
                    $scope.arg1=$scope.random();
                    $scope.arg2=$scope.random();
                    $scope.debug = eval($scope.arg1+$scope.selectedAction.action+$scope.arg2);
                    console.log($scope.debug);
                    if ($scope.debug == Math.floor($scope.debug) && $scope.debug<100 && $scope.debug>=0){
                            flag = 1;
                    }
                };
                $scope.tasks.push({arg1:$scope.arg1,arg2:$scope.arg2,todo:$scope.selectedAction.action,type:$scope.selectedAction.label, answer:$scope.debug,mistake:"btn-success"}) ;
            };
            $scope.tabs[1].active = true;
            $scope.timer = 60;
            var timer = $interval(function () {
                if ($scope.timer!=0){$scope.timer--;}
                else if($scope.timer==0) {
                    $interval.cancel(timer);
                    if($scope.endOfTest == false){
                    $scope.results();}}
            }, 1000);
        }
        $scope.report = "Вітаю, "+ $scope.examinedHuman.name + "! \n Ти правильно відповів на ";
            //кнопка на табі №2
        $scope.results=function(){
            $scope.timer = 0;
            $scope.userResults.push({name:$scope.examinedHuman.name});
            $scope.endOfTest = true;
            $scope.tabs[0].disabled=false;
            var errors = 0;
            for (var i=0; i<$scope.numTasks;i++){
                if ($scope.tasks[i].answer != $scope.tasks[i].userAnswer){
                    $scope.tasks[i].mistake = "btn-primary";
                    errors++;
                    $scope.userResults.push({mistakeOn:$scope.tasks[i].type,example:$scope.tasks[i].arg1+$scope.tasks[i].todo+$scope.tasks[i].arg2});
                }
            }
            $scope.userResults.push({numberMistakes:errors},{date:$filter('date')(Date.now(), 'dd.MM.yy HH:mm')});
            $scope.report+= $scope.numTasks-errors + " прикладів. \n За що отримаєш карамалеку! \n\n"+ $filter('date')(Date.now(), 'dd.MM.yy HH:mm');
alert($scope.report);
        }
        $scope.random = function() {
            return Math.floor(Math.random()*50);
        }
        $scope.pattern = /-?\d/g;
    })
