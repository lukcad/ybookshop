console.log('our logic...')

const cds = require('@sap/cds')
const logger = cds.log('ybookshop')

const { Books } = cds.entities('bookshop')

module.exports = cds.service.impl(

  function () {

    /** this.on - means that event handler for event ON. 
     * parameters:
     * 'READ' - means that event works in moment when service extract data by GET
     * 'Books' - name of entity which handler serves
     * (request, next) - function of handler with parameters `request` and `next`
     *   this function can work with your cusotm code
     *   this function should use `return` before next() because we have `fat arrow` => {} . 
     */
    //console.log('test')

    logger('test')

    this.on('READ', 'Books', (req, next) => {
      //console.log("Handling event ON during READ of Books")
      // your code is here...
      return next()
      // return [{
      //   ID: cds.utils.uuid(),
      //   title: "The White",
      //   author_ID: 2
      // }]
    })

    /**
     * this.after - handlers run after the .on handlers, 
     * frequently to enrich outbound data
     */
    //this.after('READ', 'Books', (data, req) => {
      //console.log(data)

     // data.map(book => book.title += '?')

      // we added own logger 
      // new change... 3  


    //  logger(data)
    //})

    const changeUrgencyDueToSubject = (data) => {
      if (data) {
        const books = Array.isArray(data) ? data : [data];
        books.forEach((book) => {
          if (book.title?.toLowerCase().includes("harmless")) {
            book.urgency = "HIGHT";
          }
        });
      }
    }

    // full variant of call:
    //this.after('READ', 'Books', (data) => { changeUrgencyDueToSubject(data) })

    // also yuo can write it as this:
    //this.after('READ', 'Books', (data) => changeUrgencyDueToSubject(data) )
    
    // aslo you can write this as this:
    this.after('READ', 'Books', changeUrgencyDueToSubject )

    this.on('totalStock', async() => {
      const result = await SELECT.one.columns('sum(stock) as total').from(cds.entities['Books']);
      return result.total;
    }  )

    //this.on('getStock','Foo', ({params:[id]}) => stocks[id])

    this.on('stockValue', Books, async ({params:[id]}) => {
      const result = await SELECT .columns(['stock * price as stockValue'])
      .from (Books)
      .where `ID = ${id}`
      return result;
    })
  }
) 
