sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'name/order/test/integration/FirstJourney',
		'name/order/test/integration/pages/OrderSetList',
		'name/order/test/integration/pages/OrderSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrderSetList, OrderSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('name/order') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrderSetList: OrderSetList,
					onTheOrderSetObjectPage: OrderSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);