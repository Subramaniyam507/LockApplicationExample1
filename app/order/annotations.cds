using Service1 as service from '../../srv/Serivice';

annotate service.OrderSet with @(
    UI.SelectionFields:[
        {  
            
            $value: ID,
        },
        {
            $value:customer_ID,
        },
        {
            $value: product,
        },
        {
            $value: totalamount
        }

    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'product',
            Value : product,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalamount',
            Value : totalamount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'customer_ID',
            Value : customer_ID,
        },
    ]
);
annotate service.OrderSet with {
    customer @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'CustomerSet',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : customer_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'firstName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'lastName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'age',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'country',
            },
        ],
    }
};
annotate service.OrderSet with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'product',
                Value : product,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalamount',
                Value : totalamount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'customer_ID',
                Value : customer_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
