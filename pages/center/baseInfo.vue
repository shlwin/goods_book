<template>
	<view class="u-p-l-30 u-p-r-30">
		<u-form :model="form" ref="uForm" :errorType="errorType">
			<u-form-item label="姓名" prop="name" required>
				<u-input v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				errorType: ['message'],
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: ['blur', 'change']
						}
					]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
			this.form.name = this.vuex_user.name
		},
		methods: {
			submit() {
				this.$refs.uForm.validate( async (valid) => {
					if(valid){
						// 更新用户信息
						await this.$u.api.userInfoUpdate(this.form)
						// 刷新用户信息，更新vuex_user
						this.$u.utils.updateUser()
						// 成功弹窗
						this.$u.toast('更新成功')
					}
				})
			}
		}
	}
</script>

<style>

</style>
