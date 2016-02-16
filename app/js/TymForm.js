var React =require('react');

var TymForm = React.createClass({
  render : function(){
    return (
      <section id="formBody">
        <div className="ui container">
         <form className="ui form">
          <div className="ui segments">
          <div className="two fields">
          <div className="field">
  <label>Chit Amount</label>
  <input type="text" name="chit-amount" placeholder=""/>
</div>
<div className="field">
  <label>Commision</label>
  <input type="text" name="commision" placeholder=""/>
</div>
</div>
          </div>
         </form>
        </div>
      </section>
    );
  }
});

module.exports=TymForm;
