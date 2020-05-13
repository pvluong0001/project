export default function(schema, options) {
  schema.statics.getAll = function(query, options = {}) {
    const result = this.find(query);
    const {populate} = options;

    if(populate){
      if(Array.isArray(populate)) {
        populate.forEach(item => {
          result.populate(item);
        })
      } else {
        result.populate(options.populate);
      }
    }

    return result;
  };

  schema.statics.store = function(data) {
    const row = new this(data);
    return row.save();
  };

  schema.statics.update = function(_id, updateData) {
    return this.findOneAndUpdate({_id}, {$set: updateData}, {new: true});
  };

  schema.statics.delete = function(_id) {
    return this.deleteOne({_id});
  }

  schema.statics.findById = function(_id) {
    return this.findOne({_id});
  }
}