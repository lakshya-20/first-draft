const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const {ObjectId} = mongoose.Schema.Types;
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    likes:[{
        type: ObjectId, ref: "User"
    }],
    comments:[{
        type: String,
        postedBy:{type: ObjectId, ref:"User"}
    }],
    postedBy:{
        type: ObjectId,
        ref: "User"
    }
})

blogSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema)