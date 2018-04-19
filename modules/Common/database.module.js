const ArrayHelperModule = require('../Common/array.module');

module.exports = {
    buildQuery: buildQuery,
    paginateResult: paginateResult,
    parseFilters: parseFilters,
    parseRelations: parseRelations,
    bulkInsert: bulkInsert
};


function buildQuery(params, mongooseDocument, _id, allowedPopulates) {

    var query = null;

    var filters = parseFilters(params, allowedPopulates);

    var fields = filters.select ? filters.select : null;

    if (params[_id]) {

        query = mongooseDocument.findById(params[_id], fields, filters);

    } else if (params.page) {

        query = paginateResult(mongooseDocument, params, filters);

    } else {

        query = mongooseDocument.find({});

        for (let index = 0; index < filters.populate.length; index++) {

            const element = filters.populate[index];

            query = query.populate(element);

        }

    }

    return query;
}

/**
 * Paginate result, passing as well the filters and params.
 * @param {mongooseDocument} query 
 * @param {object} requestParams 
 * @param {object} filters
 * @author Miguel Trevino 
 */
function paginateResult(query, requestParams, filters) {

    if (!requestParams.page) {
        return query;
    }
    filters.page = parseInt(requestParams.page);
    filters.limit = requestParams.perPage ? requestParams.perPage : 20;
    // console.log('final filters', filters);
    query = query.paginate({}, filters);

    return query;

}

/**
 * Parse filters: columns, populates, sort, lean
 * @param {object} params 
 * @param {array} allowedPopulates 
 * @author Miguel Trevino
 */
function parseFilters(params, allowedPopulates) {

    var filters = {};

    if (params.columns) {
        filters.select = params.columns;
    }


    filters.populate = parseRelations(params, allowedPopulates ? allowedPopulates : []);


    if (params.sort) {
        filters.sort = params.sort;
    }

    filters.lean = params.lean ? params.lean : false;

    return filters;
}

/**
 * Parse Relations, to bring populates inside the Query
 * @param {object} params 
 * @param {array} allowedPopulates
 * @author Miguel Trevino 
 */
function parseRelations(params, allowedPopulates) {
    var populates = [];
    if (params.populates) {

        for (var index = 0; index < params.populates.length; index++) {
            const requestPopulate = params.populates[index];

            allowedIndex = ArrayHelperModule.findElementIndexInArray('strings', allowedPopulates, null, requestPopulate);

            if (allowedIndex > -1) {
                populates.push(requestPopulate);
            }
        }

    }

    return populates;
}


function bulkInsert(model, documents, callback) {

    return model.insertMany(documents, callback);

}