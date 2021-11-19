import React , {Component} from 'react'


class Imports extends Component{
    render(){
        return(

            <div>
                <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
  crossorigin="anonymous">
</script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script >
{
    `
    $(document).ready(function(){
        $("#singUpLink").click(function() {
            $('#modalLogin').modal('hide');
        });
    });
    `
}
</script>
            </div>
        );
    }
}
export default Imports;