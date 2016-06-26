var CRUDApp = angular.module('portfolioApp');
CRUDApp.controller('CRUDCtrl', myfunction);
function myfunction($scope) {
    $scope.lists = [
    { code: "UNI101", title: "Intro Computing", semester: "S1", fee: 250, offered: "No" },
    { code: "UNI110", title: "Angular Development", semester: "S1", fee: 350, offered: "Yes" },
    { code: "UNI132", title: "GIS for Fun and Profit", semester: "S2", fee: 150, offered: "Yes" },
    { code: "UNI120", title: "Intro Economics", semester: "SS", fee: 500, offered: "Yes" },
    { code: "UNI152", title: "Organic Chemistry", semester: "S2", fee: 430, offered: "No" }
    ];

    $scope.sequence = 'code';
    $scope.rev = false;

    //sortBy() method takes a parameter from the form and assigns to the sequence variable.
    //If the table is already sorted by the sequence, then reverse it.
    //Otherwise, just sort the table ascendingly.
    $scope.sortBy = function (parameter) {
        if ($scope.sequence === parameter)
            $scope.rev = !$scope.rev;
        else {
            $scope.sequence = parameter;
            $scope.rev = false;
        }
    }

    //similar to sortBy() method
    $scope.sortByCode = function () {
        $scope.sequence = 'code';
        $scope.rev = false;
    }

    //delete() method uses splice() method to remove the corresponding course by passing it in the parameter.
    $scope.delete = function (course) {
        $scope.lists.splice(course, 1);
    }

    //$scope.editing is the status of editing
    $scope.editing = false;

    //$scope.adding is the status of adding
    $scope.adding = false;

    var nextCode = 199;
    $scope.staticCode = 'UNI' + nextCode;

    //edit() method sets editing status to true
    //makes a copy of selected course
    //and assigns the code of selected course to $scope.staticCode variable, which would show in the form 
    $scope.edit = function (course) {
        $scope.editing = true;
        $scope.list = angular.copy(course);
        $scope.staticCode = course.code;
    }

    //addNew() method increments the nextCode variable
    //sets the adding status to true
    //makes an empty $scope.list object
    //and sets the 'offered' checkbox to default
    $scope.addNew = function () {
        nextCode++;
        $scope.staticCode = 'UNI' + nextCode;
        $scope.adding = true;
        $scope.list = {};
        $scope.list.offered = 'Yes';
    }

    //save() methods checks if the user is editing or adding.
    //A for loop is used to find the course being editing by comparing 2 codes.
    //If the user is adding a new course, then it would be added to the end of the array.
    //After saving, the $scope.list would be set to an empty new object
    //The form would be set to untouched.
    //$scope.editing status and $scope.adding status would be set to false, so the form would vanish.
    $scope.save = function () {
        {
            if ($scope.editing) {
                for (i = 0; i < $scope.lists.length; i++) {
                    if ($scope.lists[i].code == $scope.staticCode) {
                        $scope.lists[i] = $scope.list;
                    }
                }
            }
            else {
                $scope.list.code = 'UNI' + nextCode;
                $scope.lists.push($scope.list);
            }
        }
        $scope.list = {};
        $scope.inputForm.$setUntouched();
        $scope.editing = false;
        $scope.adding = false;
    }

    //cancel() method checks if the user was editing or adding.
    //If the user was adding a new course, then the nextCode would be set to last number
    //$scope.editing status and $scope.adding status would be set to false, so the form would vanish.
    $scope.cancel = function () {
        {
            if ($scope.adding)
                nextCode--;
        }
        $scope.editing = false;
        $scope.adding = false;
    }
}
