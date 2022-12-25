"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEsIndex = void 0;
const es_1 = require("@cool-midway/es");
/**
 * 测试索引
 */
let TestEsIndex = class TestEsIndex extends es_1.BaseEsIndex {
    indexInfo() {
        return {
            // 需要安装ik分词器 https://github.com/medcl/elasticsearch-analysis-ik
            name: {
                type: 'text',
                analyzer: 'ik_max_word',
                search_analyzer: 'ik_max_word',
                fields: {
                    raw: {
                        type: 'keyword',
                    },
                },
            },
            age: {
                type: 'long',
            },
        };
    }
};
TestEsIndex = __decorate([
    (0, es_1.CoolEsIndex)({ name: 'test', replicas: 0 })
], TestEsIndex);
exports.TestEsIndex = TestEsIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vZXMvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx3Q0FBb0U7QUFFcEU7O0dBRUc7QUFFSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsZ0JBQVc7SUFDMUMsU0FBUztRQUNQLE9BQU87WUFDTCwrREFBK0Q7WUFDL0QsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixlQUFlLEVBQUUsYUFBYTtnQkFDOUIsTUFBTSxFQUFFO29CQUNOLEdBQUcsRUFBRTt3QkFDSCxJQUFJLEVBQUUsU0FBUztxQkFDaEI7aUJBQ0Y7YUFDRjtZQUNELEdBQUcsRUFBRTtnQkFDSCxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBbkJZLFdBQVc7SUFEdkIsSUFBQSxnQkFBVyxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7R0FDOUIsV0FBVyxDQW1CdkI7QUFuQlksa0NBQVcifQ==