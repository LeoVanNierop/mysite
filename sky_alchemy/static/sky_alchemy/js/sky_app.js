var app = angular.module('skyrimjs',[]);
app.controller("alchemy", function($scope, $http){
    $http.get('./ingredients').success(function(data, status, headers, config){
        var i;
        $scope.ingredients = data;
        $scope.knownEffects = [];
        for(i=0;i<$scope.ingredients.length;i++){
            $scope.ingredients[i].owned = 0;          
        }
        for(i=0;i<$scope.ingredients.length;i++){
            $scope.knownEffects[i] = [false, false, false, false];
        }
        $scope.selectIngredientSet='all';      
    }).error(function(data,status,headers,config){
        $scope.ingredients = ["no ingredients returned"];
    });
    $scope.potions = {
        twoIngredient: [],
        threeIngredient: [],
    };
    $scope.showEffects=false;
    $scope.addIngredients = function(id, number){
        $scope.ingredients[id].owned += number;
        if($scope.ingredients[id].owned <= 0){
            $scope.ingredients[id].owned = 0;
            $scope.calculatePotions();
        }
        if($scope.ingredients[id].owned === number){
            $scope.calculatePotions();
        }    
    };
    $scope.clearOwned = function(){
        var i;
        for(i=0;i<$scope.ingredients.length;i++){
            $scope.ingredients[i].owned=0;
        }
        $scope.potions.twoIngredient = [];
        $scope.potions.threeIngredient = [];
    }
    $scope.resetKnownEffects = function(){
        var i;
        for(i=0;i<$scope.knownEffects.length;i++){
            $scope.knownEffects[i] = [false,false,false,false];
        }
        $scope.sortLearned()
    }
    $scope.calculatePotionsTwo = function(){
        var effects = [], learneffects=[];
        var i,j,k,l;
        $scope.potions.twoIngredient=[]
        for(i=0;i<$scope.ingredients.length;i++){
            for(j=i+1;j<$scope.ingredients.length;j++){
                if($scope.ingredients[i].owned && $scope.ingredients[j].owned){
                    //now you have ingredients, and only go over them once. Check if it makes a potion.
                    for(k=0;k<4;k++){
                        for(l=0;l<4;l++){
                            if ($scope.ingredients[i].effects[k]===$scope.ingredients[j].effects[l]){
                                effects[effects.length]=$scope.ingredients[i].effects[k]
                            }
                        }                     
                    }
                    //create array leaneffects so we know what we gain from making the potion.
                    if(effects.length){
                        learneffects = [];
                        for(k=0;k<effects.length;k++){
                            for(l=0;l<4;l++){
                                if($scope.ingredients[i].effects[l]===effects[k]){
                                    learneffects.push([i,l])
                                }
                                if($scope.ingredients[j].effects[l]===effects[k]){
                                    learneffects.push([j,l])
                                }
                            }
                        }
                        $scope.potions.twoIngredient[$scope.potions.twoIngredient.length] = {
                                ingredient1: i,
                                ingredient2: j,
                                effects: effects,
                                learneffects: learneffects,
                                learnnew: function(){
                                    var i, total=0;
                                    for(i=0;i<this.learneffects.length;i++){
                                        if(!$scope.knownEffects[this.learneffects[i][0]][this.learneffects[i][1]]){
                                            total++;
                                        }
                                    }
                                    return total;
                                }
                            };
                        effects = [];                           
                    }
                }
            }
        }
    }
    $scope.calculatePotionsThree = function(){
        $scope.potions.threeIngredient=[]
        var neweffects = [], learneffects=[];
        var effects, i, j, k, l;
        var effectAllready = false;
        var newPotion = true;
        var ingredient1, ingredient2, numeffects;
        for(i=0;i<$scope.potions.twoIngredient.length;i++){
            ingredient1 = $scope.potions.twoIngredient[i].ingredient1;
            ingredient2 = $scope.potions.twoIngredient[i].ingredient2;
            for(j=Math.max(ingredient1, ingredient2)+1;j<$scope.ingredients.length;j++){
                if($scope.ingredients[j].owned){
                    for(k=0;k<4;k++){
                        for(l=0; l<$scope.potions.twoIngredient[i].effects.length ;l++){
                            if($scope.ingredients[j].effects[k] === $scope.potions.twoIngredient[i].effects[l]){
                                effectAllready = true;
                                break;
                            }
                            //doesn't have this effect in the potion yet. Now check if it matches an effect in one of the ingredients
                        }
                        if(effectAllready){
                            effectAllready = false;
                            continue;
                        }
                        else{                       
                            for(l=0;l<4;l++){                           
                                if($scope.ingredients[j].effects[k]===$scope.ingredients[ingredient1].effects[l] || $scope.ingredients[j].effects[k]===$scope.ingredients[ingredient2].effects[l]){
                                    neweffects[neweffects.length]=$scope.ingredients[j].effects[k]
                                }
                            }
                        }
                    }
                    if(neweffects.length > 0){
                        //we now have a 3-ingredient potion, but need to check if there are 2-ingredient potions 
                        //with either (ingredient1 & j) or (ingredient2 & j) that allready has (effects + neweffects)
                        //can check if those potions' effects.length === effects.length+neweffects.length
                        numeffects = neweffects.length + $scope.potions.twoIngredient[i].effects.length
                        for(l=0;l<$scope.potions.twoIngredient.length; l++){                           
                            if($scope.potions.twoIngredient[l].ingredient1 === ingredient1 && $scope.potions.twoIngredient[l].ingredient2 === j && $scope.potions.twoIngredient[l].effects.length === numeffects){
                                newPotion=false;
                                break;
                            }
                            if($scope.potions.twoIngredient[l].ingredient1 === ingredient2 && $scope.potions.twoIngredient[l].ingredient2 === j){
                                if($scope.potions.twoIngredient[l].effects.length === numeffects){
                                    newPotion=false;
                                }
                                break;
                            } 
                        }
                        if(newPotion){
                            effects = $scope.potions.twoIngredient[i].effects.concat(neweffects)
                            learneffects=[];
                            for(k=0;k<effects.length;k++){
                                for(l=0;l<4;l++){
                                    if($scope.ingredients[ingredient1].effects[l]===effects[k]){
                                        learneffects.push([ingredient1,l])
                                    }
                                    if($scope.ingredients[ingredient2].effects[l]===effects[k]){
                                        learneffects.push([ingredient2,l])
                                    }
                                    if($scope.ingredients[j].effects[l]===effects[k]){
                                        learneffects.push([j,l])
                                    }
                                }
                            }
                            $scope.potions.threeIngredient[$scope.potions.threeIngredient.length] = {
                                ingredient1: ingredient1,
                                ingredient2: ingredient2,
                                ingredient3: j,
                                effects: effects,
                                learneffects: learneffects,
                                learnnew: function(){
                                    var i, total=0;
                                    for(i=0;i<this.learneffects.length;i++){
                                        if(!$scope.knownEffects[this.learneffects[i][0]][this.learneffects[i][1]]){
                                            total++;
                                        }
                                    }
                                    return total;
                                }    
                            }
                            neweffects = []
                        }
                        else{
                            newPotion=true;
                        }
                        
                    }
                }
            }
        }
    }
    $scope.calculatePotions = function(){
        $scope.calculatePotionsTwo();
        $scope.calculatePotionsThree();
        $scope.sortLearned();
    }
    $scope.sortLearned = function(){
        $scope.potions.twoIngredient.sort(function(a,b){
            var alearn = 0, blearn = 0;
            var i;
            for(i=0;i<a.learneffects.length;i++){               
                if(!$scope.knownEffects[a.learneffects[i][0]][a.learneffects[i][1]]){
                    alearn += 1;
                }
            }
            for(i=0;i<b.learneffects.length;i++){
                if(!$scope.knownEffects[b.learneffects[i][0]][b.learneffects[i][1]]){
                    blearn += 1;
                }
            }
            return blearn-alearn;
        });
        $scope.potions.threeIngredient.sort(function(a,b){
            var alearn = 0, blearn = 0;
            var i;
            for(i=0;i<a.learneffects.length;i++){
                if(!$scope.knownEffects[a.learneffects[i][0]][a.learneffects[i][1]]){                   
                    alearn += 1;
                }
            }
            for(i=0;i<b.learneffects.length;i++){
                if(!$scope.knownEffects[b.learneffects[i][0]][b.learneffects[i][1]]){
                    blearn += 1;
                }
            }
            return blearn-alearn;
        });
    }
    $scope.makePotion = function(potion){
        var i;
        $scope.addIngredients(potion.ingredient1, -1);
        $scope.addIngredients(potion.ingredient2, -1);
        if(potion.ingredient3){
            $scope.addIngredients(potion.ingredient3, -1);
        }
        for(i=0;i<potion.learneffects.length;i++){
            $scope.knownEffects[potion.learneffects[i][0]][potion.learneffects[i][1]] = true;
        }
        $scope.calculatePotions();
    }
    $scope.top_potions = function(){
        //return a list of potions
        var results = [];
        var i;
        if((!$scope.potions.twoIngredient.length)&&(!$scope.potions.threeIngredient.length)){
            return results;
        }
        var highest=0;
        if($scope.potions.twoIngredient.length){
            highest = $scope.potions.twoIngredient[0].learnnew()/2
        }
        if($scope.potions.threeIngredient.length){
            highest = Math.max(highest, $scope.potions.threeIngredient[0].learnnew()/3);
        }
        if(!highest){
            return results;
        }
        for(i=0;i<$scope.potions.twoIngredient.length;i++){
            if($scope.potions.twoIngredient[i].learnnew()/2 === highest){
                results.push($scope.potions.twoIngredient[i]);
            }
        }
        for(i=0;i<$scope.potions.threeIngredient.length;i++){
            if($scope.potions.threeIngredient[i].learnnew()/3 === highest){
                results.push($scope.potions.threeIngredient[i]);
            }
        }
        return results;
    }
    $scope.saveProgress = function(){
        var have = []
        var i;
        var d= new Date();
        for(i=0;i<$scope.ingredients.length;i++){
            if($scope.ingredients[i].owned){
                have.push([i,$scope.ingredients[i].owned])
            }
        }
        d.setTime(d.getTime()+30*24*60*60*1000) //30 days
        document.cookie = "known="+JSON.stringify($scope.knownEffects)+"; expires="+d.toUTCString();
        document.cookie = "ingredients="+JSON.stringify(have)+"; expires="+d.toUTCString();
    }
    $scope.loadProgress = function(){
        var i,j,k;
        var ca = document.cookie.split(";");
        var effectList
        var temp_owned, c;
        for(i=0;i<ca.length;i++){
            c=ca[i]
            while(c.charAt(0)==' '){
                c = c.substring(1);//strip leading spaces
            }
            if(c.indexOf("known=")===0){
                console.log("known");
                $scope.resetKnownEffects();
                effectList = c.substring(6)
                effectList = JSON.parse(effectList);
                for(j=0;j<effectList.length;j++){
                    for(k=0;k<4;k++){
                        if(effectList[j][k]){
                            $scope.knownEffects[j][k]=true;
                        }
                    }
                }
            }
            if(c.indexOf("ingredients=")===0){
                temp_owned = JSON.parse(c.substring(12));
                $scope.clearOwned()
                for(i=0; i<temp_owned.length;i++){
                    $scope.addIngredients(temp_owned[i][0],temp_owned[i][1])
                }
            }
        }
    }
});