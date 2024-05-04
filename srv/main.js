console.log('our logic...')

const cds = require('@sap/cds')

module.exports = cds.service.impl(

  function () {
    
    /** this.on - means that event handler for event ON. 
     * parameters:
     * 'READ' - means that event works in moment when service extract data by GET
     * 'Books' - name of entity which handler serves
     * (request, next) - function of handler with parameters `request` and `next`
     *   this function can work with your cusotme code
     *   this function should use `return next()` to pass response of service with data. 
     */
    this.on('READ', 'Books', (
      request, next
    ) => {
      console.log("Handling event ON during READ of Books")
      // your code is here...
      return next()

    })
  }
) 
