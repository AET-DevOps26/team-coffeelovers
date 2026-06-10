subscription_id = "${{ secrets.AZURE_SUBSCRIPTION_ID }}"
resource_group_name = "devops"
virtual_network_name = "devops-vnet"
subnet_name = "default"
network_interface_name = "devops225_z1"
vm_name = "devops"
admin_username = "azureuser"
public_ip_address = "${{ secrets.AZURE_VM_IP }}"
location = "swedencentral"
environment = "prod"

tags = {
  "Project"     = "AI-Travel-Planner"
  "Environment" = "Production"
  "ManagedBy"   = "Terraform"
  "Owner"       = "DevOps-Team"
}
