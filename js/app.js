(function (window) {
    'use strict';

    // Initial data.
    var data = [{descr: "Taste JavaScript", completed: true}
                ,{descr: "Buy a unicorn", completed: false}];


    // Listen on enter key press to add an entry to the list.
    d3.select('.new-todo').on('keyup', function(){
        if(this.value == "") return;

        if(d3.event.keyCode == 13) {
            data.push({descr: this.value, completed: false});
            update();
            this.value = "";
        }
    });

    // Init list.
    update();

    // Update-exit-remove loop.
    function update() {

        var list = d3.select('.todo-list');

        var item = list.selectAll('li')
            .data(data);

        var liEnter = item.enter()

        var li = liEnter.append("li")
            .classed('completed', function(d){
                return d.completed;
            });

        var view = li.append('div')
            .attr('class', 'view');

        view.append('label')
            .text(function(d){
                return d.descr;
            });

        view.append('button')
            .attr('class', 'destroy')
            .on('click', function(d,i){
                data.splice(i,1);
                update();
            });

        item.exit().remove();

        item.classed('completed', function(d,i){
                console.log(d,i)
                return d.completed;
            })
            .select('label')
            .text(function(d,i){
                return d.descr;
            })
    }

})(window);
