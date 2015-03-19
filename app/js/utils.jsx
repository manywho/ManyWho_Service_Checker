manywho.utils = {

    addPropertyToList: function (list, property) {
        var type = '';
        if (property.contentType === 'ContentObject' || property.contentType === 'ContentList') {
            type = <span> of type <em>{ property.typeElementDeveloperName }</em></span>;
        }

        var required = property.required ? <strong>(Required)</strong> : '';

        list.push(
            <li><strong>{ property.developerName }</strong>: { property.contentType } { type } { required }</li>
        );
    }

};