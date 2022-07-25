<template>
	<!-- component -->
	<!-- This is an example component -->
	<div class="max-w-6xl mx-auto">


		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<div class="p-4">
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative mt-1">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"></path>
						</svg>
					</div>
					<input type="text" id="table-search" v-model="search" @input="searchOnTable"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search by name..">
				</div>
			</div>
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							S. No
						</th>

						<th scope="col" class="px-6 py-3">
							Username
						</th>
						<th scope="col" class="px-6 py-3">
							Email
						</th>
						<th scope="col" class="px-6 py-3">
							Role
						</th>

						<th scope="col" class="px-6 py-3">
							<span class="sr-only">Edit</span>

						</th>
					</tr>
				</thead>
				<tbody v-for="user in users" :key="user.id" :user="user">
					<tr v-if="user.id != currentUser.id"
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td class="px-6 py-4">
						</td>

						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							{{ user.username }}
						</th>
						<td class="px-6 py-4">
							{{ user.email }}
						</td>
						<td class="px-6 py-4">
							<ul>
								<li v-for="(role, index) in user.roles" :key="index">

									<span v-if="!selectRoles">{{ role.name }}</span>
									<span v-if="!selectRoles" @click="selectRoles = true"><svg
											class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" stroke-width="2"
											stroke="currentColor" fill="none" stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
											<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
											<line x1="16" y1="5" x2="19" y2="8" />
										</svg></span>
									<span v-if="selectRoles">
										<select id="userRoles" v-on:change="saveRole($event, user)"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
											<option selected>{{ role.name }}</option>
											<option value="admin">Admin</option>
											<option value="user">User</option>
										</select>

									</span>


								</li>


							</ul>

						</td>
						<td class="px-6 py-4 text-right">

							<span @click="Delete(user)"
								class="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
								Delete</span>
						</td>
					</tr>

				</tbody>
			</table>
		</div>

	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
import MenuAccordion from "../../components/MenuAccordion.vue";
import UserData from "../../services/user.service";


export default {
	name: 'List-users',
	data() {
		return {
			search: null,
			searched: [],
			content: '',
			users: [],
			selectRoles: false
		};
	},
	components: {
		Icon,
		MenuAccordion,
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		}
	},
	methods: {
		sidebarToggle: function () {
			document.querySelector(".flex-sidebar").classList.add("hidden");
		},
		getUsers() {
			UserData.getAll()
				.then(response => {
					this.users = response.data;
				})
		},
		searchOnTable() {

			UserData.findUser(this.search)
				.then(response => {
					this.users = response.data;
				})
			// this.users = searchByName(this.users, this.search);
			//  console.log("tttttttt",  this.searched)
		},
		saveRole(e, u) {
			var data = {
				"roles": [e.target.value]
			}
			UserData.updateRole(u.id, data)
				.then(response => {
					this.getUsers();
					this.selectRoles = false;

				})

		},

		Delete(user) {
			UserData.delete(user.id)
				.then(response => {
					this.getUsers();

				})
		}
	},
	mounted() {
		this.getUsers();
	},
};
</script>

<style>
table {
	counter-reset: rowNumber-1;
}

table tr {
	counter-increment: rowNumber;
}

table tr td:first-child::before {
	content: counter(rowNumber);
}
</style>