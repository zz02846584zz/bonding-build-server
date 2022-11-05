"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleDTO = void 0;
const validate_1 = require("@midwayjs/validate");
/**
 * 文章參數校驗
 */
class ArticleDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "title", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "slug", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "content", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "summary", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.boolean()),
    __metadata("design:type", Boolean)
], ArticleDTO.prototype, "commentOpen", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.number()),
    __metadata("design:type", Number)
], ArticleDTO.prototype, "categoryIds", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()
        .pattern(/(active|draft|pending|reject|schedule)/)
        .required()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().isoDate()),
    __metadata("design:type", String)
], ArticleDTO.prototype, "publishTime", void 0);
exports.ArticleDTO = ArticleDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZHRvL2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BEOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0NBd0N0QjtBQXJDQztJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3lDQUNyQjtBQUlkO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7d0NBQ1g7QUFJYjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7OzJDQUNSO0FBSWhCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7MkNBQ1I7QUFJaEI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs2Q0FDTjtBQUlsQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7OytDQUNKO0FBSXJCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7K0NBQ0o7QUFRcEI7SUFMQyxJQUFBLGVBQUksRUFDSCxtQkFBUSxDQUFDLE1BQU0sRUFBRTtTQUNkLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztTQUNqRCxRQUFRLEVBQUUsQ0FDZDs7MENBQ2M7QUFJZjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7OytDQUNkO0FBdkN0QixnQ0F3Q0MifQ==